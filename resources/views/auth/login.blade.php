@extends('layouts.page')

@section('content')
<section class="flex flex-col md:flex-row h-screen items-center">

  <div class="bg-sky-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
    <img src="/images/masjidcherok.png" alt="" class="w-full h-full object-cover">
  </div>

  <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div class="w-full h-100">

      <img src="/images/logomasjid.png" class="mx-auto" alt="">

      <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">Selamat Datang ke Sistem Pengurusan
        MJCTB</h1>

      <form action="{{ route('login') }}" class="mt-6" method="POST">
        @csrf
        <div>
          <label class="block text-gray-700">Alamat Email</label>
          <input type="email" value="{{old('email')}}" name="email" id="" placeholder="Email"
            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 @error('email') !border-red-500 @enderror focus:bg-white focus:outline-none"
            autofocus autocomplete required>

          @error('email')
          <span class="text-red-500" role="alert">
            <strong>{{ $message }}</strong>
          </span>
          @enderror
        </div>

        <div class="mt-4">
          <label class="block text-gray-700">Kata Kunci</label>
          <input type="password" name="password" value="{{old('password')}}" id="" placeholder="Kata Kunci"
            minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
            @error('password') !border-red-500 @enderror focus:bg-white focus:outline-none" required>
          @error('password')
          <span class="text-red-500" role="alert">
            <strong>{{ $message }}</strong>
          </span>
          @enderror
        </div>

        <div class="text-right mt-2">
          <a href="/password/reset"
            class="text-sm font-semibold text-gray-700 hover:text-sky-600 focus:text-sky-600">Lupa Kata
            Laluan</a>
        </div>

        <button type="submit" class="w-full block bg-sky-500 hover:bg-sky-400 focus:bg-sky-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log Masuk</button>
      </form>
    </div>
  </div>

</section>
@endsection