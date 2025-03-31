<?php

use App\Models\District;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 65);
            $table->string('email')->nullable();
            $table->string('phoneNumber', 15);
            $table->string('nit',14)->nullable()->unique();
            $table->foreignIdFor(District::class)->constrained();
            $table->text('address');
            $table->text('description')->nullable();
            $table->string('status',45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
