import './style/FromStyling.css'
import React, {useState} from 'react'
import HandleRadioButtons from './HandleRadioButtons';

const Form = ({submitted, hasBeenSubmitted}) => {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [gender, setGender] = useState("");
  const [preference, setPreference] = useState("");
  const [vaccinated, setVaccinated] = useState(true);

  const handleGender = (evt) => {
    setGender(evt.target.value)
  }

  const handlePreference = (evt) => {
    setPreference(evt.target.value)
  }

  const handleName = (evt) => {
      setName(evt.target.value)
  }

  const handleAge = (evt) => {
      setAge(evt.target.value)
  }

  const handleLocation = (evt) => {
      setLocation(evt.target.value)
  }
  const handleHobbies = (evt) => {
      setHobbies(evt.target.value)
  }

  const handleVaccinated = (evt) => {
      setVaccinated(evt.target.value)
  }

  const handleSubmitForm = (evt) => {
      evt.preventDefault()

      submitted({
          name: name,
          age: age,
          location: location,
          hobbies: hobbies,
          vaccinated: vaccinated,
          gender: gender,
          preference : preference,
      })
  }

  
  if (hasBeenSubmitted){
    return null
  }else{
    return (
      <form className="form" onSubmit={handleSubmitForm}>
      <input 
      className="setUp-input"
       type="text" 
       placeholder="Name" 
       value={name} 
       onChange={handleName} required/>

      <input 
      className="setUp-input"
      type="number" 
      placeholder="Age" 
      value={age} 
      onChange={handleAge} required/>

      <input 
      className="setUp-input" 
      type="text" 
      placeholder="Location" 
      value={location} 
      onChange={handleLocation} required/>

       <input 
       className="setUp-input" 
       type="text" 
       placeholder="Hobbies & Interests" 
       value={hobbies} 
       onChange={handleHobbies} required/>
       <select value="gender" className="option-bar" onChange={handleGender}>
           <option value="gender" disabled hidden>Choose a gender</option>
           <option value="male" >Male</option>
           <option value="female" >Female</option>
           <option value="non-binary" >non-binary</option>
       </select>
       <select value="gender" className="option-bar" onChange={handlePreference}>
           <option value="gender" disabled hidden>Choose a Preference</option>
           <option value="male" >Male</option>
           <option value="female" >Female</option>
           <option value="non-binary" >non-binary</option>
           <option value="all" >All</option> 
       </select>
       <p id="vaccinated">Vaccinated</p>

       <HandleRadioButtons vaccinated={vaccinated}/>
  </form>
    )
  }
}

export default Form;