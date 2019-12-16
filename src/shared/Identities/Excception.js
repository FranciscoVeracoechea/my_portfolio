import { union, derivations } from 'folktale/adt/union';


const errorMsg = {
  401: 'Unauthenticated',
  404: 'The requested resource could not be found',
  422: 'Unable to process, please try again and make sure the data is correct',
  500: 'An error has occurred, please try again and make sure the data is correct',
  503: 'Service Unavailable',
};


const Excception = union('Excception', {
  DatabaseExcception(error, message = errorMsg[503], status = 503) {
    return {
      message,
      status,
      error,
    };
  },
  NotFoundException(error, message = errorMsg[404], status = 404) {
    return {
      message,
      status,
      error,
    };
  },
  InternalServerErrorException(error, message = errorMsg[500], status = 500) {
    return {
      message,
      status,
      error,
    };
  },
  AuthenticationException(error, message = errorMsg[401], status = 401) {
    return {
      message,
      status,
      error,
    };
  },
  ValidationException(errors, message = errorMsg[422], status = 422) {
    return {
      errors,
      message,
      status,
    };
  },
}).derive(derivations.debugRepresentation, derivations.equality);


export const {
  DatabaseExcception,
  ValidationException,
  AuthenticationException,
  InternalServerErrorException,
  NotFoundException,
} = Excception;

export const catchDatabaseExcception = next => error => next(DatabaseExcception(error));
export const catchInternalServerErrorException = next => error => next(InternalServerErrorException(error));
