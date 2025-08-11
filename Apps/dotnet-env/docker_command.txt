cd dotnet-env
docker build -t dotnet-env .
docker run -p 5000:5000 \
  -e APP_NAME="Dotnet Test App" \
  -e ENVIRONMENT="Development" \
  -e VERSION="1.0.0" \
  dotnet-env
