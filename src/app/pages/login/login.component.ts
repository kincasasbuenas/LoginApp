import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordar = false;

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    if ( localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  login( f: NgForm ) {
    if (f.invalid) {
      return;
    } else {

      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Cargando...',
      });
      Swal.showLoading();

      this.auth.login(this.usuario).subscribe(resp => {
        console.log(resp);
        Swal.close();
        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
      });
    }
  }

}
