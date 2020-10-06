/*
    * Author: Bernoulli Mukuna
    * created: 13/05/2020
*/

class InputsValidation {

    constructor(name, username, email, password, password2) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.password2 = password2
    }

    allFieldsCheck(){
        /*
        *  This method serves as a checker for all the possible entries all the form
        * */

        let error = [];
        let password_validation_errors = [];

        if(!this.name || !this.username || !this.email || !this.password || !this.password2){
            // Some of the fields of the form are empty
            if(!this.name && !this.username && !this.email && !this.password && !this.password2){
                // All the fields of the form are empty

                error.push(this.error_messages('allfields', 'All Fields Must be filled in!'));
            }
            else{
                // Some of the fields are empty and others are filled

                if(!this.name){
                    error.push(this.error_messages('name', 'Name MUST not be empty'));
                }
                if(!this.username){
                    error.push(this.error_messages('username', 'Username MUST not be empty'));
                }
                if(!this.email){
                    error.push(this.error_messages('email', 'Email MUST not be empty'));
                }
                if(!this.password){
                    error.push(this.error_messages('password', 'Password MUST not be empty'));
                }
                if(!this.password2){
                    error.push(this.error_messages('password2', 'Password Confirmation MUST not be empty'));
                }
            }
        }
        else{
            // all the fields contains some inputs. Now, it is the validation of those inputs

            if(this.name.length<2){
                // Check length of the name

                error.push(this.error_messages('name', 'Name MUST contain at least 2 letters'));
            }

            // below is the validation of the password
            password_validation_errors = this.password_checker(this.password, this.password2);
        }
        Array.prototype.push.apply(error,password_validation_errors);
        return error;
    }

    password_checker(password, conf_password){
        /*
        *  This method serves as checker of the password put by the user
        * */

        let password_errors = [];
        let uppercase = /[A-Z]/;
        let lowercase = /[a-z]/;
        let numbers =  /[0-9]/;
        let num_seq = /\d{4,}/;

        if(password.length<9){
            password_errors.push(this.error_messages('password', 'password length must be at least 9'));
        }
        else{
            if(password === conf_password){
                if(!uppercase.test(password)){
                    password_errors.push(this.error_messages('password', 'password must contain at least uppercase letter'));
                }
                if(!lowercase.test(password)){
                    password_errors.push(this.error_messages('password', 'password must contain at least lowercase letter'));
                }
                if(!numbers.test(password) || num_seq.test(password)){
                    password_errors.push(this.error_messages('password', 'password must contain a least one digit (but no more than 3 consecutively)'));
                }
            }
            else{
                password_errors.push(this.error_messages('password', 'password DO NOT match!'));
            }
        }
        return password_errors;
    }

    error_messages(label, message){
        /*
        * The error message to return to the user
        * */

        return{
            label: label,
            message: message
        }
    }

}

module.exports = {
    InputsValidation: InputsValidation
}
