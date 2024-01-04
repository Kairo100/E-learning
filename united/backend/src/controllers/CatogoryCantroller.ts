
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response } from 'express';



// endpoint -> POST /api/category/new

export const createCategory = async (req: Request, res: Response) => {
  try {
    const{catName,catDescription}=req.body;
    const newCategory = await prisma.category.create({
      data: {
        catName,
      catDescription,
       
      },
    });

    res.json({
      isSuccess: true,
      result: { ...newCategory },
    });
  } catch (error) {
    console.log(error);
    res.json({
      isSuccess: false,
      message: 'Failed to create new category',
    });
  }
};

// endpoint -> PUT /api/category/edit/:catId

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { catId } = req.params;
    const{catName,catDescription}=req.body;;


    const updatingCategory = await prisma.category.update({
      where: {
        catId:+catId,
      },
      data:{
        catName,
        catDescription
      }
    });


  } catch (error) {
    res.json({
      message: 'Failed to update the category ',
      isSuccess: false,
    });
    console.log(error)
  }

};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include:{
        Cource:true
      }
    });
    res.json({
      isSuccess: true,
      result: [...categories],
    });
  } catch (error) {
    res.json({
      isSuccess: false,
      message: 'Failed to fetch the categories data',
    });
    console.log(error)
  }
};



export const getOneCategory = async (req: Request, res: Response) => {

  try {
    const {catId}=req.params;
          
    const searchingoneoflinecource=await prisma.category.findFirst({
        where:{
            catId:+catId
        }
    })
    if(!searchingoneoflinecource){
        return res.json({
            message:"The oflinecource your are searching doesn't exist"
        })
    }
    if(searchingoneoflinecource){
        return res.json(searchingoneoflinecource)
    }
} catch (error) {
    // return res.json({
    //     message:"Something went Wrong"
    // })
    console.log(error)
}
};

// endpoint -> DELETE /api/category/remove/:catId -> soft delete

export const removeCategory = async (req: Request, res: Response) => {
  try {
    await prisma.category.update({
      where: {
        catId: +req.params.catId,
      },
      data: {
        isDeleted: true,
      },
    });

    res.json({
      isSuccess: true,
      message: 'Category deleted successfully!',
    });
  } catch (error) {
    res.json({
      isSuccess: false,
      message: 'Failed to delete category with the id of ' + req.params.id,
    });
  }
};

// endpoint -> DELETE /api/category/deleteAll
export const deletecategory =async(req:Request,res:Response)=>{
  try {
    const {catId}=req.params;
    const findingfrist =await prisma.category.findFirst({
      where:{
        catId:+catId
      }
    })
    if(!findingfrist){
      return res.json({
        message:"the category you are attempting to delet is not exist"
      })
    }
    if(findingfrist){
      const deleteData =await prisma.category.delete({
        where:{
          catId:+catId
        }
      })

    return res.json({
      message:"Deleted successfully",
      deleteData
    })}
  } catch (error) {
    
  }
}

export const trash=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const updating=await prisma.category.update({
      where:{
        catId:+id
      },
      data:{
        isDeleted:true
      }
    })
    // console.log(updating)
  } catch (error) {
    console.log(error)
  }
}
export const recycle=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const updating=await prisma.category.update({
      where:{
        catId:+id
      },
      data:{
        isDeleted:false
      }
    })
    // console.log(updating)
  } catch (error) {
    console.log(error)
  }
}