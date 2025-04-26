import React, { useState } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import styles from './FaqsQuestions.module.scss';

interface Question {
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    question: 'Where are your servers located?',
    answer:
      'Our servers are with Amazon Web Services AWS and are hosted within the US and the EU. For more information on AWS, click here.'
  },
  {
    question: 'Who has access to the servers?',
    answer:
      'Only certain members of our team have authorization to access the servers. We never breach customer confidentiality.'
  },
  {
    question: 'What about physical security?',
    answer:
      'AWS infrastructure is housed in Amazon-controlled data centers throughout the world. Only those within Amazon who have a legitimate business need to have such information know the actual location of these data centers.'
  },
  {
    question: 'Where can I find your uptime report?',
    answer: 'You can see the latest uptime report https://status.teamwork.com/.'
  },
  {
    question: 'Where do I report a security concern?',
    answer: 'You can report a security concern by emailing us at security@teamwork.com.'
  }
];

function Questions() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleAnswer = (question: string) => {
    setActiveQuestion((prev) => (prev === question ? null : question));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.question}>
          <div className={styles.questionContainer}>
            <div className={styles.questionContent}>{question.question} </div>
            <div className={styles.btn}>
              <button onClick={() => toggleAnswer(question.question)}>
                {activeQuestion === question.question ? <FaRegMinusSquare /> : <FaRegPlusSquare />}
              </button>
            </div>
          </div>
          <div className={styles.questionAnswer}>
            {activeQuestion === question.question && <div>{question.answer}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Questions;
