import React, { useState, useRef } from 'react';
import './company.css'; // Import CSS file
import { RiEdit2Line } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import Logo4 from './asserts/Logo4.png';
import Logo5 from './asserts/Logo5.png';
import coverImage from './asserts/back.png';
import profImage from './asserts/bg.png';

export default function Company() {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState("CompanyName");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat");
  const [location, setLocation] = useState("Location, Location");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    company: "",
    logo: null,
    type: "",
    level: "",
    location: "",
    description: "",
    time: "Now"
  });

  const [showPostJob, setShowPostJob] = useState(false);

  const backgroundInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const bioInputRef = useRef(null);
  const locationInputRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(URL.createObjectURL(file));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const handleNameEdit = () => {
    nameInputRef.current.style.display = 'block';
    nameInputRef.current.focus();
  };

  const handleNameSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setName(e.target.value);
      nameInputRef.current.style.display = 'none';
    }
  };

  const handleBioEdit = () => {
    bioInputRef.current.style.display = 'block';
    bioInputRef.current.focus();
  };
  
  const handleBioSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setBio(e.target.value);
      bioInputRef.current.style.display = 'none';
    }
  };

  const handleLocationEdit = () => {
    locationInputRef.current.style.display = 'block';
    locationInputRef.current.focus();
  };

  const handleLocationSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setLocation(e.target.value);
      locationInputRef.current.style.display = 'none';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJobForm({ ...newJobForm, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const maxWidth = 50; // Maximum width of the singleJob container
      const maxHeight = 50; // Maximum height of the singleJob container
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const resizedImage = canvas.toDataURL('image/jpeg'); // You can change the format if needed
      setNewJobForm({ ...newJobForm, logo: resizedImage });
    };
  };

  reader.readAsDataURL(file);
};

  const initialJobs = [
    {
      id: 1,
      title: "Backend Developer",
      company: "Google",
      logo: Logo4,
      type: "Full-time",
      level: "Junior",
      location: "Remote",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
      time: "Now"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Facebook",
        logo: Logo5,
        type: "Full-time",
        level: "Senior",
        location: "On-site",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
      },
    //   {
    //     id: 3,
    //     title: "DevOps Engineer",
    //     company: "Amazon",
    //     logo: Logo4,
    //     type: "Contract",
    //     level: "Mid-level",
    //     location: "Remote",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
    //     time: "Now"
    //   },
    // Add more initial job data if needed
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [visibleJobs, setVisibleJobs] = useState(initialJobs.slice(0, 3));
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    if (!showMore) {
      setVisibleJobs(jobs); // Show all jobs
    } else {
      setVisibleJobs(jobs.slice(0, 3)); // Show only the first 3 jobs
    }
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    setVisibleJobs(updatedJobs.slice(0, 3)); // Update visible jobs after deletion
  };

  const addJob = () => {
    const newJob = {
      id: jobs.length + 1,
      title: newJobForm.title,
      company: newJobForm.company,
      logo: newJobForm.logo || Logo5, 
      type: newJobForm.type,
      level: newJobForm.level,
      location: newJobForm.location,
      description: newJobForm.description,
      time: newJobForm.time
    };
    const updatedJobs = [...jobs, newJob]; 
    setJobs(updatedJobs);
    setVisibleJobs(updatedJobs.slice(0, 3)); // Update visible jobs after addition
    setNewJobForm({
      title: "",
      company: "",
      logo: null,
      type: "",
      level: "",
      location: "",
      description: "",
      time: "Now"
    });
    toggleShowPostJob();
  };

  const toggleShowPostJob = () => {
    setShowPostJob(!showPostJob);
  };

  return (
    <div className='profile-wrapper'>  
      <div className="timeline-container">
        <div className="timeline-header">
          <div className="cover-container">
            <img src={backgroundImage || coverImage} className="cover-image" alt="cover" />
            <label htmlFor="backgroundImageInput">
              <RiEdit2Line className="edit-icon" onClick={toggleOptions} />
            </label>
            <input type="file" id="backgroundImageInput" accept="image/*" onChange={handleBackgroundImageChange} style={{ display: 'none' }} />
          </div>
          <div className='profile-image-container'>
            <div className="profile-image-frame">
              <img src={profileImage || profImage} className='profile-image' alt='profile' />
            </div>
            <label htmlFor="profileImageInput">
              <RiEdit2Line className="edit-icon" />
            </label>
            <input type="file" id="profileImageInput" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} />
          </div>
          <div className='profile-text'>
            <h2 onClick={handleNameEdit}>{name}</h2>
            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleNameSave}
              onBlur={handleNameSave}
              style={{ display: 'none' }}
            />
          </div>
          <div className='profile-text'>
            <p onClick={handleBioEdit}>{bio}</p>
            <textarea
              ref={bioInputRef}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onKeyDown={handleBioSave}
              onBlur={handleBioSave}
              style={{ display: 'none' }}
            />
          </div>
          <div className='location'>
            <p onClick={handleLocationEdit}>{location}</p>
            <input
              ref={locationInputRef}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleLocationSave}
              onBlur={handleLocationSave}
              style={{ display: 'none' }}
            />
          </div>
          <div className="edit-link">
            <p><a href="#">Edit my profile</a></p>
            <p><a href="#">More</a></p>  
          </div>
          <div className="divider"></div>
          <div className='jobs'>
            <h3>Featured Jobs</h3>
            <div>
              <div className="jobContainer">
                {visibleJobs.map(job => (
                  <div key={job.id} className="singleJob">
                    <div className="flex_container">
                      <div className="company_container">
                        <img src={job.logo} alt="Company Logo" />
                        <h1 className="text_heading">{job.title}</h1>
                      </div>
                      <span className="span">
                        <IoTimeOutline />{job.time}
                      </span>
                    </div>
                    <span className="company_name">{job.company}</span>
                    <button className="button17">{job.type}</button>
                    <button className="button17">{job.level}</button>
                    <button className="button17">{job.location}</button>
                    <p className="custom_paragraph">{job.description}</p>
                    <button className="button13" onClick={() => deleteJob(job.id)}>Apply Now</button>
                  </div>
                ))}
                
              </div>

            </div>
            <button onClick={toggleShowMore} className="showMoreButton">
                  {showMore ? "Show Less" : "Show More"}
                </button>
          </div>
          {/* <button className='MoreButton' onClick={toggleShowPostJob}>Post a Job</button> */}
          {/* {showPostJob && (
                          <div className="singleJob">
                          <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={newJobForm.title}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={newJobForm.company}
                            onChange={handleChange}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                          <input
                            type="text"
                            placeholder="Type"
                            name="type"
                            value={newJobForm.type}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Level"
                            name="level"
                            value={newJobForm.level}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={newJobForm.location}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={newJobForm.description}
                            onChange={handleChange}
                          />
                          <button className="button13" onClick={addJob}>Post</button>
                        </div>
          )} */}
          
        </div>
      </div>
      <button className='MoreButton' onClick={toggleShowPostJob}>Post a Job</button>
          {showPostJob && (
                          <div className="singleJobb">
                          <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={newJobForm.title}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={newJobForm.company}
                            onChange={handleChange}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                          <input
                            type="text"
                            placeholder="Type"
                            name="type"
                            value={newJobForm.type}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Level"
                            name="level"
                            value={newJobForm.level}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={newJobForm.location}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={newJobForm.description}
                            onChange={handleChange}
                          />
                          <button className="button13" onClick={addJob}>Post</button>
                        </div>
          )}
    </div>
  );
}
