import React, { useState, useEffect } from 'react';
import { MdOutlineWatchLater } from "react-icons/md";
import { CSSReset, Container, Button, Progress, Tag, Text, TagLabel } from '@chakra-ui/react';
import Question from "./components/Question";
import Options from "./components/Options";
import FinalScore from "./components/FinalScore";
import StudentDashboardLayout from "../../components/StudentDashboardLayout";

const PracticeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer (600 seconds)
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/questions.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch questions. Status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Retrieve state from localStorage
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const {
        savedQuestions,
        savedCurrentQuestionIndex,
        savedScore,
        savedAnsweredQuestions,
        savedTimeLeft,
        savedTimestamp,
      } = JSON.parse(savedState);

      const currentTime = Math.floor(Date.now() / 1000);
      const timeElapsed = currentTime - savedTimestamp;
      const adjustedTimeLeft = savedTimeLeft - timeElapsed;

      if (adjustedTimeLeft > 0) {
        setQuestions(savedQuestions);
        setCurrentQuestionIndex(savedCurrentQuestionIndex);
        setScore(savedScore);
        setAnsweredQuestions(savedAnsweredQuestions);
        setTimeLeft(adjustedTimeLeft);
      } else {
        setTimeUp(true);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Save state to localStorage
    const currentTime = Math.floor(Date.now() / 1000);
    const state = {
      savedQuestions: questions,
      savedCurrentQuestionIndex: currentQuestionIndex,
      savedScore: score,
      savedAnsweredQuestions: answeredQuestions,
      savedTimeLeft: timeLeft,
      savedTimestamp: currentTime,
    };
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [questions, currentQuestionIndex, score, answeredQuestions, timeLeft]);

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const updatedOptions = currentQuestion.options.map(option => {
        if (option.id === selectedOption) {
          return { ...option, isSelected: true };
        } else {
          return { ...option, isSelected: false };
        }
      });

      const selectedOptionObj = updatedOptions.find(option => option.id === selectedOption);

      if (selectedOptionObj && selectedOptionObj.isCorrect) {
        setScore(prevScore => prevScore + 1);
      }

      setAnsweredQuestions(prev => [...prev, currentQuestionIndex]); // Mark question as answered
      setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[currentQuestionIndex] = { ...currentQuestion, options: updatedOptions };
        return updatedQuestions;
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null); // Reset selected option for the new question
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const isQuestionAnswered = (index) => answeredQuestions.includes(index);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (answeredQuestions.length === 10 || timeUp) {
    // All questions answered or time is up, render FinalScore component
    return (
      <StudentDashboardLayout title='Final Score'>
        <CSSReset />
        <Container maxW="container.sm" centerContent>
          <FinalScore score={score} questions={questions} answeredQuestions={answeredQuestions} />
        </Container>
        </StudentDashboardLayout>
    );
  }

  // Render Question and Options components for each question
  return (
    <StudentDashboardLayout title="Practice Test">
     <CSSReset />
      <Container maxW="container.md" centerContent>
        <Tag size='lg' variant='outline' colorScheme='blue' mt={4} gap={1}>
        <MdOutlineWatchLater />
          <Text>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</Text>
        </Tag>

        <Progress colorScheme='green' size='sm' value={((currentQuestionIndex + 1) / 10) * 100} mt={4} />
        <Tag size='lg' variant='outline' colorScheme='blue'>
          <TagLabel>Multiple choise question</TagLabel>
        </Tag>
        <Question
          key={`question-${currentQuestionIndex}`}
          question={questions[currentQuestionIndex]}
          serialNumber={currentQuestionIndex + 1}
        />
        <Options
          key={`options-${currentQuestionIndex}`}
          options={questions[currentQuestionIndex].options}
          selectedOption={selectedOption}
          onChange={(value) => setSelectedOption(value)}
          disabled={isQuestionAnswered(currentQuestionIndex)}
        />
        <Button mt={6} w='full' colorScheme="teal" onClick={handleNextQuestion}>
          Submit answer
        </Button>
      </Container>
    </StudentDashboardLayout>
  );
};

export default PracticeTest;
