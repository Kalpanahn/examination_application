import React, { useState, useEffect, useRef } from 'react';
import "../styles/QuestionsList.css";
import { Card, CardHeader, CardContent, Grid, Paper, Typography, Box, Button, FormControlLabel, Checkbox } from '@mui/material';

function QuestionsList() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const intervalRef = useRef(null);

    const questionsData = {
        1: {
            question: "1. What is the capital of France?",
            options: [
                "A. Paris",
                "B. London",
                "C. Berlin",
                "D. Madrid"
            ]
        },
        2: {
            question: "2. Which planet is known as the Red Planet?",
            options: [
                "A. Earth",
                "B. Mars",
                "C. Jupiter",
                "D. Saturn"
            ]
        },
        3: {
            question: "3. What is the largest ocean on Earth?",
            options: [
                "A. Atlantic Ocean",
                "B. Indian Ocean",
                "C. Arctic Ocean",
                "D. Pacific Ocean"
            ]
        },
        4: {
            question: "4. Who wrote 'To Kill a Mockingbird'?",
            options: [
                "A. Harper Lee",
                "B. J.K. Rowling",
                "C. Ernest Hemingway",
                "D. Mark Twain"
            ]
        },
        5: {
            question: "5. What is the square root of 64?",
            options: [
                "A. 6",
                "B. 7",
                "C. 8",
                "D. 9"
            ]
        },
        6: {
            question: "6. Which element has the chemical symbol 'O'?",
            options: [
                "A. Oxygen",
                "B. Gold",
                "C. Silver",
                "D. Hydrogen"
            ]
        },
        7: {
            question: "7. What is the smallest prime number?",
            options: [
                "A. 0",
                "B. 1",
                "C. 2",
                "D. 3"
            ]
        },
        8: {
            question: "8. In which year did the Titanic sink?",
            options: [
                "A. 1905",
                "B. 1910",
                "C. 1912",
                "D. 1915"
            ]
        },
        9: {
            question: "9. What is the capital city of Australia?",
            options: [
                "A. Sydney",
                "B. Melbourne",
                "C. Brisbane",
                "D. Canberra"
            ]
        },
        10: {
            question: "10. What is the powerhouse of the cell?",
            options: [
                "A. Nucleus",
                "B. Ribosome",
                "C. Mitochondria",
                "D. Golgi apparatus"
            ]
        },
        // Continue adding questions similarly
        20: {
            question: "20. What is the chemical symbol for water?",
            options: [
                "A. H2O",
                "B. CO2",
                "C. NaCl",
                "D. O2"
            ]
        }
    };


    const questions = Array.from({ length: 20 }, (_, i) => i + 1);
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [questionData, setQuestionData] = useState(questionsData[1] || null);

    const handleNumberClick = (number) => {
        setSelectedNumber(number);
        setQuestionData(questionsData[number] || null);
    };

    const handlePrevious = () => {
        const currentIndex = questions.indexOf(selectedNumber);
        if (currentIndex > 0) {
            const prevNumber = questions[currentIndex - 1];
            setSelectedNumber(prevNumber);
            setQuestionData(questionsData[prevNumber] || null);
        }
    };

    const handleNext = () => {
        const currentIndex = questions.indexOf(selectedNumber);
        if (currentIndex < questions.length - 1) {
            const nextNumber = questions[currentIndex + 1];
            setSelectedNumber(nextNumber);
            setQuestionData(questionsData[nextNumber] || null);
        }
    };

    const handleSubmit = () => {
        alert('Submitted!');
        setIsActive(false);
        // setShowQuestions(false);
    };

    const handleStart = () => {
        setIsActive(true);
        setShowQuestions(true);
    };

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime >= 3600) {
                        clearInterval(intervalRef.current);
                        handleSubmit();
                        return prevTime;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <>
            <div className="card cardmain_align">
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <header style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgb(225 212 221)', width: '100%' }}>
                        <h1>Timer: {formatTime(time)}</h1>
                        <div>
                            <Button onClick={handleStart} disabled={isActive} style={{ marginRight: '10px' }}>Start</Button>
                            <Button onClick={handleSubmit} disabled={!isActive}>Submit</Button>
                        </div>
                    </header>
                    {showQuestions && (
                        <>
                            <Grid item xs={8}>
                                {questionData && (
                                    <Paper sx={{ flex: 1, padding: 2, backgroundColor: '#1c1c1c', color: 'white' }}>
                                        <Typography variant="body1" gutterBottom>
                                            {questionData.question}
                                        </Typography>
                                        <Grid container spacing={2} direction="column" sx={{ marginBottom: 2 }}>
                                            {questionData.options.map((option, index) => (
                                                <Grid item key={index}>
                                                    <Button
                                                        variant="outlined"
                                                        fullWidth
                                                        sx={{ justifyContent: 'flex-start', borderColor: '#444' }}
                                                    >
                                                        {option}
                                                    </Button>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <div className="nav nav-underline justify-content-center">
                                            <button className="btn btn-primary buttonstyle"
                                                onClick={handlePrevious} disabled={questions.indexOf(selectedNumber) === 0}>Previous</button>&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-primary buttonstyle"
                                                onClick={handleNext} disabled={questions.indexOf(selectedNumber) === questions.length - 1}>Next</button>
                                        </div>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <FormControlLabel control={<Checkbox color="primary" />} label="Mark for review" style={{ color: 'black' }} />
                                        </Box>
                                    </Paper>
                                )}
                            </Grid>

                            <Grid item xs={4}>
                                <Card sx={{ backgroundColor: '#1c1c1c', color: 'white' }} className='Questions-card'>
                                    <CardHeader title="Questions" style={{ color: '#a72f2fa3' }} />
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            {questions.map((number) => (
                                                <Grid item key={number} xs={4}>
                                                    <Paper
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: '50%',
                                                            backgroundColor: selectedNumber === number ? '#3498db' : '#444',
                                                            color: 'white',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s ease',
                                                        }}
                                                        onClick={() => handleNumberClick(number)}
                                                    >
                                                        {number}
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </>
                    )}
                </Grid>
            </div>
        </>
    );
}

export default QuestionsList;
