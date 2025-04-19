import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [fileBuffer, setFileBuffer] = useState(null)
  const [addBook, { isLoading, isError }] = useAddBookMutation()
  const [imageFileName, setimageFileName] = useState('')
  const navigate=useNavigate()
  const onSubmit = async (data) => {
   
    const formData = new FormData();

    
    formData.append('title', data.title); 
    formData.append('category', data.category);   
    formData.append('trending', data.trending);    
    formData.append('coverImagee', imageFile);   
    formData.append('oldPrice', data.oldPrice);    
    formData.append('newPrice', data.newPrice);    
    formData.append('description', data.description);  
    formData.append('stock', data.stock);  
   

    // const newBookData = {
    //   ...data,
    //   coverImage: fileBuffer
    // }
   
    try {
      await addBook(formData).unwrap();
      Swal.fire({
        title: "Book added",
        text: "Your book is uploaded successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      reset();
      setimageFileName('')
      setimageFile(null);
      setFileBuffer(null)
     navigate('/dashboard')
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book. Please try again.")
    }

  }



  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setimageFile(file);
      setimageFileName(file.name);


      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {

          setFileBuffer(reader.result)
        };

        reader.readAsDataURL(file); 
      }
    }
  };

 
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data" className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}

        />
        

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}

        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}

        />
         <InputField
          label="stock"
          name="stock"
          placeholder="Enter book stock"
          type="number"
          register={register}

        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" name='coverImagee' onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddBook