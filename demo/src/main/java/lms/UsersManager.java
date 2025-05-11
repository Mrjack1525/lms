package lms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UsersManager {

	@Autowired
	JWTManager JWT;
	
	@Autowired
	UsersRepository UR;
	public String addUser(Users u) {
		if(UR.validateEmail(u.getEmail())>0)
		      return "401::Email already Exist";
		UR.save(u);
		System.out.println(u.getName());
		return "200::User Registration Successfull";
	}
	public String getFullname(String token) {
	    String email = JWT.validateToken(token);
	    if(email.compareTo("401") == 0)
	      return "401::Token Expired!";
	    Users U = UR.findById(email).get();
	    return U.getName();
	}
	
	public String validateCredentials(String email,String password)
	{
		if(UR.validateCredentials(email,password)>0) {
			String token=JWT.generateToken(email);
			Users user = UR.findById(email).get(); // Assuming user is already in DB
	        int role = user.getRole();
			return "200::"+token + "::"+ role ;
		}
		return "401::Invalid Credentials";
	}

}