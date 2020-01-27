const Bootcamp = require('../models/Bootcamp');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = (req, res, next) => {
  const bootcamps = Bootcamp.find()
    .then(data => {
      res.status(200).json({
        success: true,
        count: data.length,
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
};

// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = (req, res, next) => {
  const bootcamp = Bootcamp.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          data: 'None Bootcamp found'
        });
      }
      res.status(200).json({
        success: true,
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
};

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootcamp = (req, res, next) => {
  Bootcamp.create(req.body)
    .then(data => {
      res.status(201).json({
        success: true,
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
};

// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = (req, res, next) => {
  Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          data: 'None Bootcamp found'
        });
      }
      res.status(200).json({
        success: true,
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
};

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = (req, res, next) => {
  Bootcamp.findByIdAndDelete(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          data: 'None Bootcamp found'
        });
      }
      res.status(200).json({
        success: true,
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
};
