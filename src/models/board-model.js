import mongoose, {Schema} from "mongoose";

const boardSchema = new Schema(
    {
        title:
        {
            type: String,
            trim: true,
            default: "Untitled",

        },

        description:
        {
            type: String,
            trim: true
        },

        owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isPublic:
        {
            type: Boolean,
            default: false
        },

        collaborators:
        [
            {
                user: 
                {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                role: 
                {
                    type: String,
                    enum: ["owner", "editor", "viewer"],
                    default: "viewer"
                }
            }
        ]
    },

    {
        timestamps: true
    }
)

export const Board = mongoose.model("Board", boardSchema);