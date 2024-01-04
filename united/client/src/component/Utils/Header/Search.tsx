import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllcourceFn } from "../../../redux/Slices/Dashboard/cources/GetAllCources";


const Searchbar = () => {
  // const router = useRouter();
  // const query = query;
  const dispatch = useDispatch<AppDispatch>();
  const [mobiles, setmobiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const allcources = useSelector((state: RootState) => state.getallcources);
  useEffect(() => {
    dispatch(getAllcourceFn());
  }, []);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your search functionality here
    console.log('Search query:', searchQuery);
    // Redirect to search results page

  };
  return (
    <div>
    <form onSubmit={handleSearchSubmit}>
    <input

      type="text"
      style={{width:"400px",marginLeft:'20px',height:'40px',borderRadius:'20px'}}
      placeholder="Search"
      value={searchQuery}
      onChange={handleSearch}

    />
  </form>
  <tbody>
          {allcources.data &&
            allcources.data
              .filter((course) =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((mapTeachers) => (
                <tr className="border" key={mapTeachers.courceId}>
                  <td className="py-4 px-3">{mapTeachers.courceId}</td>
                  <td className="py-4 px-3">{mapTeachers.title}</td>
                  <td className="py-4 px-3">{mapTeachers.Shortdescription}</td>
                  <td className="py-4 px-3">${mapTeachers.price}</td>
                  {/* <td className="py-4 px-3">{mapTeachers.id}</td> */}
                  <td className="py-4 px-3">{mapTeachers.CategoryId}</td>
                  {/* <td className="py-4 px-3"><video width='70px' height='20px' src={mapTeachers.videoUrl}></video></td> */}
                  <td className="py-4 px-3"><img src={mapTeachers.imageUrl} alt="" /></td>
                  {/* <td className="py-4 px-3">{mapTeachers.isPublished ? <p>puplished</p>:<p>Unpuplished</p>}</td> */}
                  <td className="py-4 px-3">
                    {/* {dayjs(mapTeachers.createdAt).format('DD/MM /YYYY')} */}
                  </td>
                  <td className="py-4 px-3">
                    {/* {dayjs(mapTeachers.UpadatedAt).format('DD/MM /YYYY')} */}
                  </td>

                  <td className="btnscource">
                    <button className="editcource">
                      {/* <Link to={`update/${mapTeachers.courceId}`}><Edit/></Link> */}
                    </button>
                    <button
                      className="deletecourcebtn"
                      // onClick={() => handledelete(mapTeachers.courceId)}
                    >
                      {/* <Delete/> */}
                    </button>
                    <button
                      className="deletecourcebtn"
                      // onClick={() => handlepuplish(mapTeachers.courceId)}
                    >
                      Puplish
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
</div>
  );
};

export default Searchbar;