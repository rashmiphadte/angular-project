import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showEmployeeForm = false
  employees = []
  employee_id = null
  employeeForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    emp_code: new FormControl(''),
    designation: new FormControl(''),
    department: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
    education: new FormControl(''),
    birthdate: new FormControl(''),
    hire_date: new FormControl(''),
    salary: new FormControl(''),
  });
  constructor(private api: ServiceService, public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.api.getAllEmployees().subscribe(res => {
      this.employees = res.data
    })
  }
  deleteEmployee(id) {
    this.api.deleteEmployee(id).subscribe(res => {
      if (res.status) {
        this.toastr.successToastr("Employee removed successfully", null, { showCloseButton: true });
      } else {
        this.toastr.successToastr(res.message, null, { showCloseButton: true });
      }
      this.getEmployees()
    })
  }

  addEmployee() {
    let employeeData = {
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email,
      emp_code: this.employeeForm.value.emp_code,
      designation: this.employeeForm.value.designation,
      department: this.employeeForm.value.department,
      address: this.employeeForm.value.address,
      phone: this.employeeForm.value.phone,
      gender: this.employeeForm.value.gender,
      education: this.employeeForm.value.education,
      birthdate: this.employeeForm.value.birthdate,
      hire_date: this.employeeForm.value.hire_date,
      salary: this.employeeForm.value.salary,
    }
    if (this.employee_id != null) {
      this.api.updateEmployee(employeeData, this.employee_id).subscribe(res => {
        if (res.status) {
          this.toastr.successToastr("Employee updated successfully", null, { showCloseButton: true });
        } else {
          this.toastr.errorToastr(res.message, null, { showCloseButton: true });
        }
      })
    } else {
      this.api.addEmployee(employeeData).subscribe(res => {
        console.log(res.data.status)
        if (res.data.status) {
          this.toastr.successToastr("Employee added successfully", null, { showCloseButton: true });
        } else {
          this.toastr.errorToastr(res.data.message, null, { showCloseButton: true });
        }
      })
    }
    this.showEmployeeForm = false
    this.employeeForm.value.education = ''
    this.getEmployees()
  }

  editEmployee(employeeData) {
    this.employee_id = employeeData._id
    this.showEmployeeForm = true
    let birthdate, hire_date
    if (employeeData.birthdate !== null) {
      employeeData.birthdate = new Date(employeeData.birthdate)
      let year = employeeData.birthdate.getFullYear()
      let month = employeeData.birthdate.getMonth() + 1
      let day = employeeData.birthdate.getDate();
      birthdate = this.convertDate(year, month, day)
    }
    if (employeeData.hire_date !== null) {
      employeeData.hire_date = new Date(employeeData.hire_date)
      let year = employeeData.hire_date.getFullYear()
      let month = employeeData.hire_date.getMonth() + 1
      let day = employeeData.hire_date.getDate();
      hire_date = this.convertDate(year, month, day)
    }

    this.employeeForm.patchValue({
      name: employeeData.name,
      gender: employeeData.gender,
      email: employeeData.email,
      phone: employeeData.phone,
      designation: employeeData.designation,
      department: employeeData.department,
      education: employeeData.education,
      salary: employeeData.salary,
      birthdate: new Date(birthdate),
      hire_Date: new Date(hire_date),
      address: employeeData.address,
      emp_code: employeeData.emp_code,
    })
  }

  convertDate(day, month, year) {
    let formatMonth;
    switch (month) {
      case 1:
        formatMonth = '01'
        break;
      case 2:
        formatMonth = '02'
        break;
      case 3:
        formatMonth = '03'
        break;
      case 4:
        formatMonth = '04'
        break;
      case 5:
        formatMonth = '05'
        break;
      case 6:
        formatMonth = '06'
        break;
      case 7:
        formatMonth = '07'
        break;
      case 8:
        formatMonth = '08'
        break;
      case 9:
        formatMonth = '09'
        break;
      default:
        formatMonth = month.toString()

    }
    if (day.toString().length < 2) {
      day = `0${day}`
    }
    return `${year}-${formatMonth}-${day}`;

  }
}
