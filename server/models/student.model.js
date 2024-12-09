const mongoose = require('mongoose');

const StudentReport = new mongoose.Schema({
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required : true
    },
    section: [{
        sec: {
            type: String,
            required: true,
            enum: ['preprimary', 'primary-I','primary-II'],
            default: 'preprimary'
        },
        yearReport: [{
            year: {
                type: String,
                required: true,
                enum: ["1", "2", "3"],
                default: "1"
            },
            termReport: [{
                evaluated: {
                    personal: {
                        type: Boolean,
                        default: false
                    },
                    academic: {
                        type: Boolean,
                        default: false
                    },
                    social: {
                        type: Boolean,
                        default: false
                    },
                    occupational: {
                        type: Boolean,
                        default: false
                    },
                    recreational: {
                        type: Boolean,
                        default: false
                    },
                },
                term: {
                    type: String,
                    required: true,
                    enum: ["Entry", "I", "II", "III"],
                    default: "Entry"
                },
                report: {
                    personalQA: [{
                        question: String,
                        answer: {
                            type: String,
                            enum: ["", "Yes", "No", "NA", "NE", "C-P1", "C-P2"]
                        }
                    }],
                    socialQA: [{
                        question: String,
                        answer: {
                            type: String,
                            enum: ["", "Yes", "No", "NA", "NE", "C-P1", "C-P2"]
                        }
                    }],
                    academicQA: [{
                        question: String,
                        answer: {
                            type: String,
                            enum: ["", "Yes", "No", "NA", "NE", "C-P1", "C-P2"]
                        }
                    }],
                    occupationalQA: [{
                        question: String,
                        answer: {
                            type: String,
                            enum: ["", "Yes", "No", "NA", "NE", "C-P1", "C-P2"]
                        }
                    }],
                    recreationalQA: [{
                        question: String,
                        answer: {
                            type: String,
                            enum: ["", "A", "B", "C", "D", "E"]
                        }
                    }],
                },
                percent: {
                    personalPercent: {
                        type : Number,
                        default : null
                    },
                    socialPercent: {
                        type : Number,
                        default : null
                    },
                    academicPercent: {
                        type : Number,
                        default : null
                    },
                    occupationalPercent: {
                        type : Number,
                        default : null
                    },
                    recreationalPercent: {
                        type : Number,
                        default : null
                    },
                    mode: {
                        type: String,
                        enum: ["", "A", "B", "C", "D", "E"],
                        default : ""
                    },
                },
                comment: {
                    termComment: {
                        type : String,
                        default : ""
                    },
                    personalComment: {
                        type : String,
                        default : ""
                    },
                    occupationalComment: {
                        type : String,
                        default : ""
                    },
                    recreationalComment: {
                        type : String,
                        default : ""
                    },
                    academicComment: {
                        type : String,
                        default : ""
                    },
                    socialComment: {
                        type : String,
                        default : ""
                    },
                }
            }],
            comment: {
                yearComment: {
                    type: String,
                    default: ""
                },
                yearPersonalComment: {
                    type: String,
                    default: ""
                },
                yearOccupationalComment: {
                    type: String,
                    default: ""
                },
                yearRecreationalComment: {
                    type: String,
                    default: ""
                },
                yearAcademicComment: {
                    type: String,
                    default: ""
                },
                yearSocialComment: {
                    type: String,
                    default: ""
                },
            },
            percent: {
                personalPercent: {
                    type: Number,
                    default: null
                },
                socialPercent: {
                    type: Number,
                    default: null
                },
                academicPercent: {
                    type: Number,
                    default: null
                },
                occupationalPercent: {
                    type: Number,
                    default: null
                },
                recreationalPercent: {
                    type: Number,
                    default: null
                },
                mode: {
                    type: String,
                    enum: ["", "A", "B", "C", "D", "E"],
                    default: ""
                },
            },
        }]
    }]
});

module.exports = mongoose.model('Student', StudentReport);
