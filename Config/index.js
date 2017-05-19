
var errorDefined={"validationSchema":{
  "sign_in": {
        "email": { in: "body",
            notEmpty: {
                errorMessage: 'email field is require & cannot be blank.'
            },
            isEmail:{
              errorMessage: 'email must be valid.'
            }
        },
        "password": { in: "body",
            notEmpty: {
                errorMessage: 'password field is require & cannot be blank.'
            }

        }

  },
  sign_up:{
    "name": { in: "body",
        notEmpty: {
            errorMessage: 'name field is require & cannot be blank.'
        },
        matches:{
          options:[/[a-zA-Z]{2,}$/],
          errorMessage:'name must have min 2 and max 15 characters'
        }

    },
    "email": { in: "body",
        notEmpty: {
            errorMessage: 'email field is require & cannot be blank.'
        },
        isEmail:{
          errorMessage: 'email must be valid.'
        }
    },
    "password": { in: "body",
        notEmpty: {
            errorMessage: 'password field is require & cannot be blank.'
        },
        matches:{
          options:[/[a-zA-Z]{5,8}$/],
          errorMessage:'password must have min 5 and max 8 characters'
        }

    }

  }
},

checkSystemErrors : function(err) {
return err instanceof TypeError ||
    err instanceof SyntaxError ||
    err instanceof EvalError ||
    err instanceof RangeError ||
    err instanceof ReferenceError;
}

};
/**
 * @description Default return object for all the other system/Programming errors
 * @key status @value false
 * @key message @value Something Bad Happened. Please contact system administrator.
 */
var defaultResult = {
    "status": false,
    "message": "Something Bad Happened. Please contact system administrator."
};
module.exports=errorDefined;
