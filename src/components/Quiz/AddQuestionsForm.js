import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const AddQuestionsForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const validateForm = () => {
    if (!question || options.some((option) => !option.trim())) {
      setErrorMessage('Please provide a question and all four options.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleAddQuestionClick = async () => {
    if (!validateForm()) {
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswerIndex,
    };
    console.log('new question is', newQuestion);

    try {
      const response = await fetch('http://localhost:5000/api/questions/addquestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        console.log('Question added successfully');
        // You can perform additional actions upon successful addition
      } else {
        console.error('Failed to add question');
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
    finally{
      setTimeout(() => {

        setLoading(false);
    }, 1000);
    }

    // Reset the form
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswerIndex(0);
  };

  const handleImportFile = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const data = e.target.result;

          if (file.name.endsWith('.csv')) {
            // Parse CSV
            Papa.parse(data, {
              header: true,
              dynamicTyping: true,
              complete: async (result) => {
                try {
                    const response = await fetch('http://localhost:5000/api/questions/addbulkquestions', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(result.data),
                    });
  
                    if (response.ok) {
                      console.log('Bulk questions added successfully');
                      // You can perform additional actions upon successful addition
                    } else {
                      console.error('Failed to add bulk questions');
                    }
                  } catch (error) {
                    console.error('Error adding bulk questions:', error);
                  }
              },
            });
          } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
               // Parse XLSX
               const workbook = XLSX.read(data, { type: 'array' });
               const sheetName = workbook.SheetNames[0];
               const importedQuestions = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
               console.log(importedQuestions)
   
               // Save imported questions to MongoDB
               try {
                 const response = await fetch('http://localhost:5000/api/questions/addbulkquestions', {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json',
                   },
                   body: JSON.stringify(importedQuestions),
                 });
   
                 if (response.ok) {
                   console.log('Bulk questions added successfully');
                   // You can perform additional actions upon successful addition
                 } else {
                   console.error('Failed to add bulk questions');
                 }
               } catch (error) {
                 console.error('Error adding bulk questions:', error);
               }
          } else {
            console.error('Unsupported file format');
          }
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error('Error importing file:', error);
      }
    }
  };

  return (
    <div>
      <h2>Add New Question</h2>
      <div>
        <label>Question:</label>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <div>
        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <label>Correct Answer:</label>
        <select
          value={correctAnswerIndex}
          onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
        >
          {options.map((_, index) => (
            <option key={index} value={index}>
              Option {index + 1}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button onClick={handleAddQuestionClick}>Add Question</button>
      <div>
        <label>Import Questions from File:</label>
        <input type="file" accept=".xls, .xlsx, .csv" onChange={handleImportFile} />
      </div>
    </div>
  );
};

export default AddQuestionsForm;
