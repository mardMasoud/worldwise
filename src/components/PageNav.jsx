import React from 'react'
import { Link } from 'react-router-dom'
export default function PageNav() {
  return (
  <ul>
    <li><Link to='/'>Homepage</Link></li>
    <li><Link to='/pricing'>pricing</Link></li>
    <li><Link to='/product'>product</Link></li>
  </ul>
  )
}
