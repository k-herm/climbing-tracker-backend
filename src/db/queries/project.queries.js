const Project = require('../models/project.model')

const getAllUserProjects = async (userId) => {
  try {
    const projects = await Project.find({ userId })
      .sort({ completedDate: 'desc' })

    if (!projects) return []
    return projects
  } catch (error) {
    throw new Error(error.name)
  }
}

module.exports = {
  getAllUserProjects
}