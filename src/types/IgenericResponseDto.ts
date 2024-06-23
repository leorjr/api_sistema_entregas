interface IGenericResponseDto {
    status: number
    success: boolean
    data?: any
    message?: string
    errors?: any[]
  }
  
  export default IGenericResponseDto;