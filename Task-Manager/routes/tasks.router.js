const express = require('express');
const router = express.Router();
const {
    getAllTask,
    createTask,
    getTask,
    updatePutTask,
    updatePatchTask,
    deleteTask
} = require('../controllers/task.controller')


router.route('/').get(getAllTask).post(createTask);

router
    .route('/:id')
    .get(getTask)
    .put(updatePutTask)
    .patch(updatePatchTask)
    .delete(deleteTask);

module.exports = router;
