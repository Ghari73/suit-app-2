import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";

const api = axios.create({
  baseURL: "http://13.211.211.188:3000/api/v1",
  header: {
    "Content-type": "application/json",
  },
});

export const fetchPosts = async (postData) => {
  try {
    const response = await api.post("/auth/register", postData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to register users: " + error.response.data.message);
  }
};

export const fetchLogin = async (postData) => {
  try {
    //console.log("fetchlogin");
    const response = await api.post("/auth/login", postData);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error("Failed to login users: " + error.message);
  }
};

export const updateUserResult = async (id,result) => {
  console.log(` id update ${id}`)
  try {
    //console.log("fetchlogin");
    const response = await api.patch(`/statistics/${id}`, result);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error("Failed to update users: " + error.message);
  }
};

export const fetchUser = async (id) => {
  const authToken = await AsyncStorage.getItem("userToken");
  console.log("ini token ", authToken);
  try {
    const response = await api.get(`/users/${id}`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data.data.user);
    return response.data.data.user;
  } catch (e) {
    console.log(e.response.data);
    throw new Error("Failed to fetch user " + e.message);
  }
};
export const fetchLeaderboards = async (id) => {
  const authToken = await AsyncStorage.getItem("userToken");
  console.log("ini token ", authToken);
  try {
    const response = await api.get(`/statistics/leaderboard`);
    console.log(response.data.data.ranking);
    return response.data.data.ranking;
  } catch (e) {
    console.log(e.response.data);
    throw new Error("Failed to fetch user " + e.message);
  }
};

export const updateUser = async (id, avatarUrl) => {
  const authToken = await AsyncStorage.getItem("userToken");
  console.log(authToken);
  // console.log("ini id", id);
  try {
    const response = await api.patch(
      `/users/${id}`,
      {
        avatar_url: avatarUrl,
      },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const socket = () => {
  const socket = io("http://13.211.211.188:3000");
  return socket;
};
