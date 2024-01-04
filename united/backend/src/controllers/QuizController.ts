import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const Quiz = express();


Quiz.use(express.json());

Quiz.get('/quizzes', async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
Quiz.get('/quizzes/:id', async (req: Request, res: Response) => {
  try {
    const {id}=req.params;
    const quizzes = await prisma.quiz.findFirst({
        where:{
            id:+id
        },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


export const createQuestion = async (req: Request, res: Response) => {
  const { text, quizId } = req.body;

  try {
    const question = await prisma.question.create({
      data: {
        text,
        quiz: { connect: { id: quizId } },
      },
    });
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const createOption = async (req: Request, res: Response) => {
  const { text, isCorrect, questionId } = req.body;

  try {
    const option = await prisma.option.create({
      data: {
        text,
        isCorrect,
        questionId,
      },
    });
    res.json(option);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  const { title, description, Totalscore, totalscoreEarned, courseId } = req.body;

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        Totalscore,
        totalscoreEarned,
        courseId,
    
      },
    });
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: { questions: { include: { options: true } } },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export default Quiz;