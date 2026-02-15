# Sistema de Turnos Angular

Una aplicación web desarrollada con Angular que permite a los usuarios iniciar sesión, ver una lista de empleados y asignarles turnos. Los turnos se almacenan localmente en el navegador.

## Tecnologías Utilizadas

*   **Angular v21.1:** Framework principal.
*   **TypeScript:** Lenguaje de programación.
*   **Angular Material:** Biblioteca de componentes UI.
*   **RxJS:** Para manejar flujos de datos asíncronos.
*   **Angular HttpClient:** Para realizar peticiones HTTP.
*   **`localStorage`:** Para persistencia local de datos (estado de sesión y turnos).
*   **API Pública:** Se utiliza `https://jsonplaceholder.typicode.com/users` para obtener la lista de empleados.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

1.  **Node.js:** (versión LTS recomendada) Puedes descargarlo desde [https://nodejs.org/](https://nodejs.org/).
2.  **Angular CLI:** Una vez instalado Node.js, ábre tu terminal o línea de comandos y ejecuta:
    ```bash
    npm install -g @angular/cli
    ```

## Instalación y Ejecución

1.  **Descargar el código:** Clona este repositorio o descarga el archivo ZIP del código fuente.
    ```bash
    git clone https://github.com/deimergarcia/sistema-de-turnos.git
    ```
2.  **Navegar al directorio del proyecto:** Abre tu terminal o línea de comandos, navega hasta la carpeta donde descargaste el proyecto. Por ejemplo, si la carpeta se llama `sistema-de-turnos`:
    ```bash
    cd sistema-de-turnos
    ```
3.  **Instalar dependencias:** Ejecuta el siguiente comando para descargar todas las bibliotecas necesarias.
    ```bash
    npm install
    ```
4.  **Ejecutar la aplicación:** Una vez instaladas las dependencias, inicia la aplicación.
    ```bash
    ng serve
    ```
5.  **Abrir en el navegador:** Abre tu navegador web y visita la siguiente dirección:
    ```
    http://localhost:4200
    ```

## Credenciales de Acceso

Para iniciar sesión, utiliza las siguientes credenciales por defecto:

*   **Email:** `admin@test.com`
*   **Contraseña:** `123456`

## Estructura del Proyecto

La aplicación sigue una estructura modular organizada por funcionalidades y tipos de archivos:

```
src/
└── app/
    ├── components/
    │   ├── appointment-form/
    │   │   ├── appointment-form.css
    │   │   ├── appointment-form.html
    │   │   ├── appointment-form.spec.ts
    │   │   └── appointment-form.ts
    │   ├── employees/
    │   │   ├── employees.css
    │   │   ├── employees.html
    │   │   ├── employees.spec.ts
    │   │   └── employees.ts
    │   └── login/
    │       ├── login.css
    │       ├── login.html
    │       ├── login.spec.ts
    │       └── login.ts
    ├── guards/
    │   ├── auth-guard.spec.ts
    │   └── auth-guard.ts
    ├── modals/
    │   ├── appointment-list/
    │   │   ├── appointments-list.css
    │   │   ├── appointments-list.html
    │   │   ├── appointments-list.spec.ts
    │   │   └── appointments-list.ts
    │   └── confirmation-dialog/
    │       ├── confirmation-dialog.css
    │       ├── confirmation-dialog.html
    │       ├── confirmation-dialog.spec.ts
    │       └── confirmation-dialog.ts
    ├── models/
    │   ├── appointment.ts
    │   ├── appointmentList.ts
    │   ├── credentials.ts
    │   └── employee.ts
    ├── services/
    │   ├── auth.spec.ts
    │   ├── auth.ts
    │   ├── employee.spec.ts
    │   └── employee.ts
    └── app.routes.ts
```
### Características Principales

*   **Inicio de Sesión:** Formulario con validación de email y contraseña.
*   **Rutas Protegidas:** El acceso a la lista de empleados y al formulario de turnos requiere autenticación mediante un guardia.
*   **Listado de Empleados:** Carga y muestra la lista de empleados obtenida de la API externa.
*   **Asignación de Turnos:** Permite seleccionar un empleado y asignarle un turno con fecha y horarios, validando que la hora de fin sea mayor a la de inicio.
*   **Persistencia Local:** Los turnos asignados se guardan en `localStorage`.
*   **Visualización de Turnos por Empleado:** Muestra en un modal los turnos asignados a un empleado específico.
*   **Diálogos Modales:** Confirma la asignación de turnos y muestra la lista de turnos.
*   **Manejo de Errores:** Captura y maneja errores al cargar datos de la API.
*   **Uso de Interfaces:** Tipado estricto con interfaces para `Employee`, `Appointment`, etc.
*   **Arquitectura Standalone:** Utiliza el paradigma moderno de Standalone Components de Angular.