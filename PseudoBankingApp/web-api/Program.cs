using Assignment2.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using web_api.Data;

// Don't forget to finish implementing the Login Freeze and the BillPay Freeze now that their status' are set.

var builder = WebApplication.CreateBuilder(args);

// Add DB context
builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database"));
    options.UseLazyLoadingProxies();
});


// Add DataManager to Scope
builder.Services.AddScoped<DataManager>();

builder.Services.AddControllers().AddJsonOptions(x => 
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
