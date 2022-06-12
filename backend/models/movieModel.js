import mongoose from 'mongoose'

// const reviewSchema = mongoose.Schema({
//     name: {type: String, required: true},
//     m_rating: {type: Number, required: true},
//     comment:{type: String, required: true}
// },{
//     timestamps: true
// })

const movieSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },

    m_name: {
      type: String,
      required: true,
    },
    m_image: {
      type: String,
      required: true,
    },
    m_director: {
      type: String,
      required: true,
    },
    m_category: {
      type: String,
      required: true,
    },
    m_description: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    m_rating: {
      type: Number,
      required: true,
      default: 0,
    },
    
    t_price: {
      type: Number,
      required: true,
      default: 0,
    },
    },
  {
    timestamps: true,
  }
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
