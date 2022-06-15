using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using pasha.Contexts;
using pasha.Models;
using pasha.Services;
using pasha.Services.Notification;

namespace pasha.Controllers;

[ApiController]
[Route("user")]
public class UserController : Controller
{
    private readonly UserContext _userContext;
    private readonly IConfiguration _configuration;
    private readonly TelegramNotify _notify;
    // private readonly INotify _notify;

    public UserController(UserContext userContext, IConfiguration configuration, TelegramNotify notify)
    {
        _userContext = userContext;
        _configuration = configuration;
        _notify = notify;
    }

    [HttpGet]
    [Route("getname")]
    [Authorize]
    public string GetName()
    {
        return HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName).Value;
    }
    
    [HttpPost]
    [Route("updateTelegramUser")]
    [Authorize(Roles = "admin")]
    public bool UpdateTelegramUser(TelegramUserUpdate telegramUser)
    {
        return _notify.ChangeUser(telegramUser.ChatId, telegramUser.NeedSend);
        // var user = _notify.TelegramUsers.FirstOrDefault(x => x.ChatId == telegramUser.ChatId);
        // if (user == null)
        //     return false;
        // user.NeedSend = telegramUser.NeedSend;
        // return true;
    }
    
    [HttpGet]
    [Route("getTelegramUsers")]
    [Authorize(Roles = "admin")]
    public List<TelegramUser> GetAllTelegramUsers()
    {
        return _notify.TelegramUsers;
    }
    
    [HttpGet]
    [Route("getrole")]
    [Authorize]
    public string GetRole()
    {
        return HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;
    }

    [HttpPost]
    [Route("register")]
    [AllowAnonymous]
    public string Register([FromBody] User user)
    {
        if (_userContext.Users.Any(x => x.UserName.Equals(user.UserName)))
            return "userName exist";
        if (_userContext.Users.Any(x => x.Email.Equals(user.Email)))
            return "email exist";
        user.Id = _userContext.Users.Max(x => x.Id) + 1;
        user.Role = "user";
        _userContext.Users.Add(user);
        _userContext.SaveChanges();
        return Login(new UserLogin(){UserName = user.UserName, Password = user.Password});
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public string Login([FromBody] UserLogin userLogin)
    {
        if (!ModelState.IsValid)
            return null;

        var loggedInUser = _userContext.Users.FirstOrDefault(x => x.UserName == userLogin.UserName && x.Password == userLogin.Password);

        if (loggedInUser is null)
            return null;

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, loggedInUser.UserName),
            new Claim(ClaimTypes.Email, loggedInUser.Email),
            new Claim(ClaimTypes.GivenName, loggedInUser.GivenName),
            new Claim(ClaimTypes.Role, loggedInUser.Role)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:Issuer"],
            audience: _configuration["JWT:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(int.Parse(_configuration["JWT:Expires"])),
            notBefore: DateTime.UtcNow,
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"])),
                SecurityAlgorithms.HmacSha256)
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenString;
    }
}