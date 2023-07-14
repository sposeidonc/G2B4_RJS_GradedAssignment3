import { Spinner } from 'react-bootstrap'

export const LoadingStatus = () => {
  return (
    <div className='text-center' style={{height:"61vh"}}>
      <Spinner animation="border" role="status" style={{width:"4rem" , height:"4rem"}}>
      <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
