import { useState, useEffect } from 'react';
import DisplayInformation from './DisplayInformation';
import Form from './Form';

const ProfilePage = ({submitted, hasBeenSubmitted, user, handleUserEdit}) => {

    if (hasBeenSubmitted) {
        <DisplayInformation />;
    } 
    return (
        <>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
        
        <Form submitted={submitted} hasBeenSubmitted={hasBeenSubmitted} user={user}/>
        <DisplayInformation 
            name={user.name} 
            age={user.age} 
            location={user.location} 
            bio={user.bio} 
            gender={user.gender} 
            gender_preference={user.gender_preference}
            hasBeenSubmitted={hasBeenSubmitted}
            user={user}
            submitted={submitted} 
            handleUserEdit={handleUserEdit}
            />
        </>

    )
}
export default ProfilePage