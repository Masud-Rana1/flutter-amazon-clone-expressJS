import 'package:amazon_clone_f/constants/global_variables.dart';
import 'package:amazon_clone_f/features/auth/screens/auth_screen.dart';
import 'package:amazon_clone_f/features/auth/services/auth_service.dart';
import 'package:amazon_clone_f/features/home/screens/home_screen.dart';
import 'package:amazon_clone_f/providers/user_provider.dart';
import 'package:amazon_clone_f/router.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
      providers: [ChangeNotifierProvider(create: (context) => UserProvider())],
      child: const MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService authService = AuthService();
  @override
  void initState() {
    super.initState();
    authService.getUserData(context: context);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Amazon Clone',
      theme: ThemeData(
          scaffoldBackgroundColor: GlobalVariables.backgroundColor,
          colorScheme:
              const ColorScheme.light(primary: GlobalVariables.secondaryColor),
          appBarTheme: const AppBarTheme(
              systemOverlayStyle: SystemUiOverlayStyle(
                // Navigation bar
                statusBarColor: GlobalVariables.secondaryColor, // Status bar
              ),
              elevation: 0,
              iconTheme: IconThemeData(color: Colors.black))),
      onGenerateRoute: (settings) => generateRoute(settings),
      home: Provider.of<UserProvider>(context).user.token.isNotEmpty ? const HomeScreen() : const AuthScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
