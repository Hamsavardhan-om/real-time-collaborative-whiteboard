import { Schema } from "mongoose";
import mongoose from "mongoose";

const strokeSchema = new Schema(
    {
        boardID:
        {
            type: Schema.Types.ObjectId,
            ref: "Board",
            required: true
        },

        userID:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        path:
        [
            {
                x:
                {
                    type: Number,
                    required: true
                },

                y:
                {
                    type: Number,
                    required: true
                }
            }
        ],

        color:
        {
            type: String,
            default: "black"
        },

        thickness:
        {
            type: Number,
            default: 1
        },

        tool:
        {
            type: String,
            enum: ["pen","eraser"],
            default: "pen"
        },

        isDeleted:
        {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps: true
    }
);

strokeSchema.index({ boardId: 1, createdAt: 1 });

export default mongoose.model("Stroke", strokeSchema);