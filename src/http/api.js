import api from ".";


// Auth API
export const register = (userData) => api.post("/api/v1/auth/register", userData)
export const login = (credentials) => api.post("/api/v1/auth/login", credentials)
export const self = () => api.get("/api/v1/auth/self")
export const logout = () => api.delete("/api/v1/auth/logout")
export const refreshToken = () => api.post("/auth/refresh")
export const getUser = () => api.get("/users")

export const becomeWorker = (data) => api.put("/api/v1/user/become-worker", data)

// Dashboard Api
export const getDashboard = () => api.get("/api/v1/user/dashboard")
export const getLastProblemEntry = () => api.get("/api/v1/user/last-problem")

// Problem API
export const generateProblem = (problemData) => api.post("/api/v1/user/problem", problemData)
export const fetchManyProblems = ({ page = 1, limit = 7, sort = "asc" }) => api.get(`/api/v1/user/problem?page=${page}&limit=${limit}&sort=${sort}`)
// export const fetchLastProblemEntry = () => api.get(`/api/v1/user/last-problem`)
// export const fetchAllBidsOfProblem = (id) => api.get(`/api/v1/user/problem/${id}`)
export const generateSignedUrlForProblemImage = () => api.post("/api/v1/user/problem-sign-url")
export const uploadToCloudinary = (fileData) => api.post("https://api.cloudinary.com/v1_1/dfmuea3kz/upload", fileData)

// Worker API
export const fetchWorkers = ({ page = 1, limit = 7, sort = "asc" }) => api.get(`/api/v1/worker?page=${page}&limit=${limit}&sort=${sort}`)
export const fetchWorkerBids = ({ page, limit, sort }) => api.get(`/api/v1/worker/my-bids?page=${page}&limit=${limit}&sort=${sort}`)
export const checkBidPlacedOrNot = (id) => api.get(`/api/v1/worker/check-bid-place/${id}`)

// Biding API
export const placeBidForProblem = (bidData) => api.post(`/api/v1/bid`, bidData)
export const fetchAllBidsOfProblem = (id, { page, limit, sort }) => api.get(`/api/v1/bid/problem/${id}?page=${page}&limit=${limit}&sort=${sort}`)

export const acceptBid = (id) => api.post(`/api/v1/bid/accept/${id}`)