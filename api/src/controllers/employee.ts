import { Request, Response } from 'express';
import DB from './db';

export class EmployeeController {
  public Add(req: Request, res: Response) {
    console.log('add', req.body);
    const newEmployee = new DB.Models.Employee(req.body);
    newEmployee.save((err, emp) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(emp);
      }
    });
  }

  public GetById(req: Request, res: Response) {
    const usrId = req.params.id;
    DB.Models.Employee.findById(usrId, (err, emp) => {
      if (err) {
        res.status(500);
        res.send(err);
      }
      res.send(emp);
    });
  }

  public GetAll(req: Request, res: Response) {
    DB.Models.Employee.find({}, { tokens: 0 }, (err, emp) => {
      if (err) {
        res.status(500);
        res.send(err);
      }
      res.json(emp);
    });
  }

  public Update(req: Request, res: Response) {
    console.log('req.body._id', req.body._id);
    const employee = req.body;
    DB.Models.Employee.findByIdAndUpdate(req.body._id, employee, (err, emp) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  }

  public Delete(req: Request, res: Response) {
    const empId = req.params.id;
    DB.Models.Employee.findByIdAndDelete(empId, (err, emp) => {
      if (err) {
        res.status(500);
        res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  }
}
