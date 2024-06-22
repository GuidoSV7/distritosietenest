import { Injectable } from '@nestjs/common';
import { SearchLabelsDto } from './dto/seach-labels.dto';
const vision = require('@google-cloud/vision');

@Injectable()
export class GooglevisionService {

  visionClient = new vision.ImageAnnotatorClient();

  async detectLabels(searchLabelsDto: SearchLabelsDto) {

    const {imageUrl} = searchLabelsDto;
      
    const [result] = await this.visionClient.labelDetection(imageUrl);
    const labels = result.labelAnnotations;

    return labels.map(label => label.description);
  }
  
}
