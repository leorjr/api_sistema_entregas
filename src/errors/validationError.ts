class ValidationError extends Error{
	status: number;
	errors: string[];

	constructor(
		statusCode: number,
		errors: string[]
	){
		super("validation failed");
		this.status = statusCode;
		this.errors = errors;
	}
}

export default ValidationError;