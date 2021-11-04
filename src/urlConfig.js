// export const baseUrl = process.env.API || "http://160.153.249.64:9002/api/v1";

// export const baseUri = "http://160.153.249.64:9002";

export const baseUrl = process.env.API || "http://localhost:9190/api/v1";
export const baseUri = "http://localhost:9190";
export const token = localStorage.getItem("token");
export const user = JSON.parse(localStorage.getItem("user"));
export const api = `${baseUrl}`;

export const reactAppUrl = "http://localhost:4000/";
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/images/${fileName}`;
};
