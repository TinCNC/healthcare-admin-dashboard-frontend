export interface IDisease {
  _id: string;
  name: string;
  //   scientific_name: string;
  //   other_name: string;
  classification: string;
  description: string;
  // body_part: string;
  //   body_parts: string[];
  severity: string;
  created_at: string;
  updated_at: string;
}

// export class Disease {
//     @Prop({ required: true, unique: true })
//     @ApiProperty({ default: 'Disease 123' })
//     name: string;

//     @Prop({ required: false, index: 'text' })
//     @ApiProperty({ required: false })
//     description: string;

//     @Prop({ required: true, unique: true })
//     @ApiProperty({ default: 'Disease In Science' })
//     scientific_name: string;

//     @Prop()
//     @ApiProperty({ default: 'Class' })
//     classification: string;

//     @Prop({
//       type: String,
//       enum: ['Low', 'Medium', 'High', 'Extreme'],
//       required: true,
//     })
//     @ApiProperty({ default: 'Medium' })
//     severity: string;
//   }
