import { Injectable } from '@nestjs/common';
import { CreateFreelancerSkillDto } from './dto/create-freelancer-skill.dto';
import { UpdateFreelancerSkillDto } from './dto/update-freelancer-skill.dto';

@Injectable()
export class FreelancerSkillService {
  create(createFreelancerSkillDto: CreateFreelancerSkillDto) {
    return 'This action adds a new freelancerSkill';
  }

  findAll() {
    return `This action returns all freelancerSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freelancerSkill`;
  }

  update(id: number, updateFreelancerSkillDto: UpdateFreelancerSkillDto) {
    return `This action updates a #${id} freelancerSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} freelancerSkill`;
  }
}
