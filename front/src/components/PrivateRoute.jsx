import Login from "./Authorization/Login";

export const PrivateRoute = (children) => {
    let authToken = localStorage.getItem("token");
    // console.log("admin")
    if (authToken.length > 20){
        console.log("it's me")
        return children
    }
    else{
        console.log("return to login")
        return <Login/>
    }

}
