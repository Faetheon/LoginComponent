import React from 'react';

const Project = ({image_url, desc, name, tech, about}) => (
  <div className='project'>
    <div className='project-name'>{name} | {tech}</div>
    <img url={image_url}/>
    <div>{desc}</div>
    <ul>
      {
        about.map(bullet => (
          <li>{bullet}</li>
        ))
      }
    </ul>
  </div>
);

export default Project;