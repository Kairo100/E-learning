import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { customUserRequest, generateToken } from '../helpers/security/jwt';
interface RegisterUserData {
  givenName: string;
  email: string;
  password: string;
  username:string
  
}


export const RegisterUser=async(req:Request,res:Response)=>{
  try {
   
    const { email,password, givenName ,username} =
      req.body as RegisterUserData;

    if (!email ||!password || !givenName) {
      let error = {
        message: 'Please provide valid data',
      };

      return res.status(400).json(error);
    }

    // check user

    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

 

    if (checkEmail) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Email is already exist.',
      });
    }



    // register user
    const hash = bcrypt.hashSync(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password:hash,
        givenName,
        username,
        isAdmin: email === 'mahamdabdihassan008@gmail.com'  ||email ==='Cadnaanismaacillmuse8800@gmail.com'
      },
    });

    return res.json(newUser);
  } catch (error) {
    // res.status(400).json({
    //  message:"something went wrong"
    // });
    console.log(error)
  }
};
interface Login {
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as Login;

  if (!email || !password)
    return res.status(400).json({
      isSuccess: false,
      message: 'Please provide login credentials',
    });

  // check user

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user)
    return res.status(401).json({
      isSuccess: false,
      message: 'Invalid credentials.',
    });

  // if the user is in the database compare the passwords
  // Don't trust your users.

  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!checkPassword)
    return res.status(401).json({
      isSuccess: false,
      message: 'Invalid credentials.',
    });


  const result = {
    givenName: user.givenName,
    id:user.id,
    isPaid:user.isPaid,
    username:user.username,
    isAdmin:user.isAdmin,
    joinedAt: user.joinedAt,
    token: generateToken({
      username:user.username,
      givenName:user.givenName,
      isAdmin:user.isAdmin,
      userId:user.id
    }),
  };

  res.json({
    message:"Login successfully",
    result,
  });
};

export const makeAdmin = async (req: customUserRequest, res: Response) => {
  // if (!req.user?.isAdmin)
  //   return res.json({
  //     message: 'unauthorized'.toUpperCase(),
       
  //   });
  const {email,password,givenName,username}=req.body;

  const user= await prisma.user.findFirst({
    where: {
      id: +req.params.id,
    },
  });

  if (!user)
    return res.json({
      isSuccess: false,
      message: 'User not found',
    });

  await prisma.user.update({
    where: {
      id: +req.params.id,
    },
    data: {
      email,
      givenName,
      isAdmin:!user.isAdmin,
      password,
      username
    },
  });

  res.json({
    isSuccess: true,
    message: 'User updated successfully!!!',
  });
};

export const getAllUsers = async (req: customUserRequest, res: Response) => {
  try {
    if (req.user?.isAdmin)
    return res.json({
      message: 'unauthorized'.toUpperCase(),
       
    });
    const allUsers = await prisma.user.findMany();
    res.json({
      message:"Found Successfully",
      result: [...allUsers],
    });
  } catch (error) {
    res.json({
       message:"something went wrong"
    });
  }
};

export const deleteuser =async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const deletenow =await prisma.user.delete({
      where:{
        id:parseInt(id)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
export const findinguser =async(req:Request,res:Response)=>{
try {
  const{id}=req.params;
  const data =await prisma.user.findFirst({
    where:{
      id:+id
    }
  })
  res.json(data)
} catch (error) {
 return res.json({
  message:"something went wrong"
 }) 
}
}
export const chatruser=async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    const chartData = users.map((user) => ({
      givenName: user.givenName,
      // count: user.id.k,
      registerDate: user.joinedAt,
    }));

    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getoneTeacherDashboardcource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const finding = await prisma.user.findFirst({
      where: {
        id:+id
      },
      include: {
        Cource: {
          select: {
            CategoryId: true,
            content: true,
            imageUrl: true,
            videoUrl: true,
            courceId: true,
            title:true,
            Section: {
              select: {
               
                courseId: true,
                description: true,
                
                id:true,
                title:true,
                lessons: true
              }
            }
          }
        }
      }
    });
res.json(finding?.Cource)
    // Rest of your code...
  } catch (error) {
    // Handle the error
  }
};
export const studentlesson=async(req:Request,res:Response)=>{
  try {
    const{id}=req.params;
    const findinglessonstudent=await prisma.user.findFirst({
      where:{
        id:+id
      },
      include:{
        Enrollment:{
          include:{
            Cource:true
          }
        }
      }
    })
    res.json(findinglessonstudent!.Enrollment)
  } catch (error) {
    
  }
}
export const chartinfouser= async (req: Request, res: Response) => {
  const latestRegisteredUsers = await prisma.user.findMany({
    orderBy: { joinedAt: 'desc' },
    take: 10, // Adjust the number of users to retrieve as needed
  });

  res.json(latestRegisteredUsers);
};



export const yearchart= async (req:Request, res:Response) => {
  const { year } = req.params;

  try {
    const userData = await prisma.user.findMany({
      where: {
        joinedAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${Number(year) + 1}-01-01`),
        },
      },
      select: {
        joinedAt: true,
      },
    });

    const chartData = generateChartData(userData);
    res.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const generateChartData = (userData: { joinedAt: Date }[]) => {
  const chartData: { name: string; users: number }[] = [];

  for (let month = 1; month <= 12; month++) {
    const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });
    const usersCount = userData.filter(
      (user) => user.joinedAt.getMonth() === month - 1 && user.joinedAt.getFullYear() === new Date().getFullYear()
    ).length;

    chartData.push({ name: `${monthName}`, users: usersCount });
  }

  return chartData;
};

export const chartday=async(req:Request,res:Response)=>{
  try {
    const chartData = await prisma.user.groupBy({
      by: ['joinedAt'],
      _count: {
        joinedAt: true,
      },
    });
    res.json(chartData);
  } catch (error) {
    console.error('Failed to fetch chart data', error);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}
export const teacherdashboard=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const finding=await prisma.user.findFirst({
      where:{
        id:+id
      },
      include:{
        Cource:{
          select:{
            title:true,
            courceId:true,
            price:true,
            Enrollment:true,
            review:true
          },
          
        }
      }
    })
    res.json(finding)
  } catch (error) {
    
  }
}
export const trashuser=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.user.update({
      where:{
        id:+id
      },
      data:{
        IsDeleted:true
      }
      
    })
  } catch (error) {
    
  }
}
export const restoreuser=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.user.update({
      where:{
        id:+id
      },
      data:{
        IsDeleted:false
      }
      
    })
  } catch (error) {
    
  }
}
