// Define the type for the Choice object
type Choice = {
  choiceText: string;
  isCorrect: boolean;
};

// Define the type for the Question object
type Question = {
  uuid: string;
  group: string;
  healthAssessment: boolean;
  question: string;
  choices: {
    freetext: Choice[];
  };
};

// Define the type for the QuestionResult
type QuestionResult = {
  question: Question;
  answers: string[];
  correctAnswer: boolean;
};

// Define the type for the Result
type Result = {
  questionResult: QuestionResult;
};

type AssesmentAnswer = {
  assessment: Result
}


type QuestionResultResponse = GenericResponse<AssesmentAnswer>