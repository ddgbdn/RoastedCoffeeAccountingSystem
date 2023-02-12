using Contracts;
using NLog;
using RoastedCoffeeAccountingSystem.Extensions;

var builder = WebApplication.CreateBuilder(args);

LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
builder.Services.ConfigureLoggerService();

// Add services to the container.
builder.Services.ConfigureSQLContext(builder.Configuration);
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();

builder.Services.AddControllers().AddApplicationPart(typeof(Presentation.AssemblyReference).Assembly);

//Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

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

app.UseAuthorization();

app.MapControllers();

app.Run();
