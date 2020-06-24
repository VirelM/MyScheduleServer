module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://virel@localhost/my_work_schedule',
    JWT_SECRET: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1OTI1ODAzMDYsInN1YiI6InRlc3QtdXNlci0xIn0.yx0jkrCVTsi6p4y28-Eb0Swq-_85LVElECxwm11X4WE'
  }