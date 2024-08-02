# use node 20 alpine image as build image
FROM node:20-alpine as builder

# create work directory in app folder
WORKDIR /app

# install required packages for node image
RUN apk --no-cache add openssh g++ make python3 git

# copy over package.json files
COPY package.json package-lock.json ./

# install all dependencies using yarn
RUN npm install

# copy over all files to the work directory
COPY . .

# build the project
RUN npm run build

# Start final image
FROM node:20-alpine

WORKDIR /app

# Copy over build files from the builder stage
COPY --from=builder /app  .

# Expose port 3000 to the server
EXPOSE 3000

# Run the build project with yarn
ENTRYPOINT ["npm"]
CMD ["start"]
