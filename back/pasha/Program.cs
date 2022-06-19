using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using pasha.Contexts;
using pasha.Services.Notification;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DishContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("sqlite")));
builder.Services.AddDbContext<UserContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("sqlite")));

// var allowOrigins = "frontend";
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name:allowOrigins,
//         policy =>
//         {
//             policy.WithOrigins("http://localhost:3000/");
//         });
// });

builder.Services.AddSwaggerGen(optioins =>
{
    optioins.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    optioins.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme()
            {
                Reference = new OpenApiReference()
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

//Custom add Services
// builder.Services.AddSingleton<IDishService, DishService>();
// builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<TelegramNotify>();

//Create secure access
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    optioins =>
    {
        optioins.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateActor = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Custom uses and maps
app.UseRouting();
//UseAuthentication and UseAuthorization should be beetween UseRouting and UseEndpoints else authorization will failed
app.UseAuthentication();
app.UseAuthorization();
// app.UseCors(allowOrigins);
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
// app.UseEndpoints(endpoints => { endpoints.MapControllers().RequireCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()); });


// classic uses and maps
app.UseHttpsRedirection();
app.MapControllers();


app.Run();