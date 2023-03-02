using Contracts;
using Microsoft.AspNetCore.Mvc;
using NLog;
using NLog.Time;
using Presentation.ActionFilters;
using RoastedCoffeeAccountingSystem.Extensions;
using System.Text.RegularExpressions;

var builder = WebApplication.CreateBuilder(args);

LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
builder.Services.ConfigureLoggerService();

builder.Services.AddAutoMapper(typeof(Program));

// Add services to the container.
builder.Services.ConfigureSQLContext(builder.Configuration);
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();

builder.Services.Configure<ApiBehaviorOptions>(opt =>
{
    opt.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddScoped<ValidationFilterAttribute>();
builder.Services.AddControllers().AddApplicationPart(typeof(Presentation.AssemblyReference).Assembly);

//Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication();
builder.Services.ConfigureIdentity();
builder.Services.ConfigureJWT(builder.Configuration);
builder.Services.AddJwtConfiguration(builder.Configuration);

var app = builder.Build();

app.ConfigureExceptionHandler(app.Services.GetRequiredService<ILoggerManager>());

if (app.Environment.IsDevelopment())
    app.UseHsts();

//Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();