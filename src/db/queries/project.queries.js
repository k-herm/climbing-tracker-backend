const Project = require('../models/project.model')

const getAllUserProjects = async (userId, filter = {}) => {
  try {
    const projects = await Project.find({ userId, ...filter })
      .sort({ completedDate: 'asc' })

    if (!projects) return []
    return projects
  } catch (error) {
    throw new Error(error.name)
  }
}

module.exports = {
  getAllUserProjects
}